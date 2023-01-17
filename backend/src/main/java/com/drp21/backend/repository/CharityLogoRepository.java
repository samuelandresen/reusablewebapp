package com.drp21.backend.repository;

import com.drp21.backend.model.CharityLogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharityLogoRepository extends JpaRepository<CharityLogo, Long> {
}